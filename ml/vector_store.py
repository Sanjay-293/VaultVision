from qdrant_client import QdrantClient
from qdrant_client.http import models
from qdrant_client.http.models import Distance, VectorParams
import os
import uuid

class VectorStore:
    def __init__(self, persist_directory=None, embedding_function=None):
        """
        Initializes Qdrant client. 
        In local mode, it uses a directory. 
        In cloud mode, use URL and API Key.
        """
        self.collection_name = "protected_assets"
        
        # Local storage path if provided, else memory mode
        if persist_directory:
            os.makedirs(persist_directory, exist_ok=True)
            try:
                # Try to remove stale lock file before opening
                lock_file = os.path.join(persist_directory, ".lock")
                if os.path.exists(lock_file):
                    try:
                        os.remove(lock_file)
                        print(f"Removed stale lock file: {lock_file}")
                    except OSError:
                        pass  # Lock is actively held
                self.client = QdrantClient(path=persist_directory)
                print(f"[OK] Qdrant persistent storage active at: {persist_directory}")
            except RuntimeError as e:
                if "already accessed" in str(e):
                    print(f"[WARNING] Qdrant storage locked (likely by another process). Falling back to in-memory mode. Data will NOT persist across restarts.")
                    self.client = QdrantClient(":memory:")
                else:
                    raise
        else:
            # Fallback to memory for testing if no path
            print("[INFO] Qdrant starting in memory-only mode.")
            self.client = QdrantClient(":memory:")
            
        # Create collection if it doesn't exist
        collections = self.client.get_collections().collections
        exists = any(c.name == self.collection_name for c in collections)
        
        if not exists:
            print(f"Creating collection '{self.collection_name}' in Qdrant...")
            self.client.create_collection(
                collection_name=self.collection_name,
                vectors_config=VectorParams(size=512, distance=Distance.COSINE),
            )
        
    def add_asset(self, asset_id: str, embedding: list, metadata: dict = None):
        """Adds a single image embedding to Qdrant"""
        assert len(embedding) == 512, f"Embedding must be 512-d (CLIP), got {len(embedding)}"
        
        self.client.upsert(
            collection_name=self.collection_name,
            points=[
                models.PointStruct(
                    id=str(uuid.uuid4()), # Qdrant points need unique IDs (UUIDs)
                    vector=embedding,
                    payload={
                        "asset_id": asset_id,
                        **(metadata or {})
                    }
                )
            ]
        )
        
    def search_similar(self, query_embedding: list, top_k: int = 3):
        """Searches Qdrant for similar images"""
        query_response = self.client.query_points(
            collection_name=self.collection_name,
            query=query_embedding,
            limit=top_k,
            with_payload=True
        )
        
        # Format results to match the previous API for compatibility
        formatted_results = {
            "ids": [[]],
            "distances": [[]],
            "metadatas": [[]]
        }
        
        for res in query_response.points:
            formatted_results["ids"][0].append(res.payload.get("asset_id"))
            # Clamp score to [0, 1] for UI safety, though cosine can be negative
            normalized_score = max(0.0, min(1.0, res.score))
            formatted_results["distances"][0].append(1.0 - normalized_score) # Convert score to distance-like for compatibility
            formatted_results["metadatas"][0].append(res.payload)
            
        return formatted_results

    def count(self):
        """Returns the number of points in the collection"""
        return self.client.get_collection(self.collection_name).points_count
