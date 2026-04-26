# VaultVision: AI-Powered Digital Asset Protection

**Winning the Battle Against Sports Piracy with Google Vertex AI & Gemini 1.5**

---

## 🚀 The Challenge
Sports organizations lose over **$28.3 Billion** annually to illegal streams and unauthorized media usage (Source: *Synamedia & Ampere Analysis*). Existing tools are either slow, manually intensive, or easily bypassed by simple edits (cropping, filters, playback speed changes).


## 🛡️ The Solution: VaultVision
VaultVision is a scalable, real-time AI system that detects and verifies unauthorized sports media usage using cloud-native architecture. 

### Key Technical Innovations:
1.  **Hybrid AI Detection (Vertex AI + CLIP)**: Unlike legacy pixel-matching, VaultVision uses semantic embeddings. It understands the "content" of an image, detecting infringements even if the media is cropped, mirrored, or heavily filtered.
2.  **Evidence Engine (Gemini 1.5 Brain)**: The "killer feature." The system doesn't just flag content; it uses Gemini 1.5 to analyze the infringement and generate professional, actionable legal proof automatically.
3.  **Risk Intelligence System**: Automated classification of threats into High, Medium, and Low risk levels, allowing enforcement teams to prioritize high-value targets.
4.  **Premium UX/UI**: A high-performance dashboard with 60FPS animations (Framer Motion) and 3D visualizations (Three.js) to provide a world-class experience for sports executives.

---

## 🛠️ Tech Stack
- **Frontend**: Next.js (App Router), Tailwind CSS, Framer Motion, React Three Fiber.
- **Backend**: FastAPI (Python), PyTorch.
- **Database**: PostgreSQL + Qdrant (Vector Database) for sub-second semantic search.
- **AI Engine**: 
    - **Vertex AI (CLIP)** for feature extraction.
    - **Gemini 1.5 (Google Generative AI)** for risk analysis and reporting.
- **Infrastructure**: Google Cloud (Cloud Run, Cloud SQL).

---

## 🧪 How to Test (Demo Script)

### Step 1: Initialize the Pipeline
- Ensure the backend (`python main.py`) and frontend (`npm run dev`) are running.
- Access the app at `http://localhost:3000`.

### Step 2: Register Official Media
- Go to the **Registry** page (`http://localhost:3000/registry`).
- Upload an image (e.g., an official match screenshot). This extracts semantic features and stores them in the **AI Vault**.

### Step 3: Simulate Infringement
- Go to the **Detector** page (`http://localhost:3000/detector`).
- Upload a *modified* version of the same image (crop it slightly or apply a filter).
- Click **Verify Authenticity**.

### Step 4: Review Evidence
- The system will return a **90%+ match** and flag it as **HIGH RISK**.
- View the **Evidence Engine Proof** section to see the Gemini-generated analysis explaining *how* it matched and what action to take.

### Step 5: Dashboard Output
- Check the **Risk Intelligence History** to see the permanent record of the detection.

---

## 📈 Future Roadmap
- **Live Stream Interception**: Direct integration with CDN logs for sub-second stream blocking.
- **Blockchain Anchoring**: Storing infringement proof on-chain for immutable legal evidence.
- **Automated Takedowns**: API integrations with major platforms (YouTube, Twitch, X) for 1-click DMCA filing.

---
**VaultVision** - *Built for the Google Solution Challenge 2026.*

