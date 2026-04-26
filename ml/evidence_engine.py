import google.generativeai as genai
import os
from datetime import datetime

class EvidenceEngine:
    def __init__(self, api_key=None):
        self.api_key = api_key or os.getenv("GOOGLE_API_KEY")
        if self.api_key:
            genai.configure(api_key=self.api_key)
            self.model = genai.GenerativeModel('gemini-1.5-flash')
        else:
            print("WARNING: GOOGLE_API_KEY not found. Evidence Engine will use Mock mode.")
            self.model = None

    async def generate_risk_report(self, asset_name: str, similarity_score: float, risk_level: str):
        """
        Uses Gemini 1.5 to generate a professional, actionable risk report.
        """
        prompt = f"""
        System: You are VaultVision's Lead Legal & AI Analyst (powered by Gemini 1.5).
        Task: Generate a high-impact 'Digital Asset Infringement & Evidence Report'.
        
        Context:
        - Suspect Asset: {asset_name}
        - AI Similarity Signature: {similarity_score:.2%}
        - Risk Classification: {risk_level}
        - Forensic Detection Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
        
        Guidelines:
        1. Start with a 'Risk Intelligence Summary' explaining that VaultVision detected this asset using semantic fingerprinting.
        2. Provide 'Actionable Evidence' detailing why this constitutes a copyright violation (e.g., matching visual features despite modifications).
        3. Include a 'Legal Recommendation' specifically mentioning DMCA takedown procedures or automated licensing enforcement.
        4. Use a professional, authoritative tone that would impress judges.
        5. Emphasize that VaultVision provides the "Missing Link" between detection and legal action.
        """

        if self.model:
            try:
                response = self.model.generate_content(prompt)
                return response.text
            except Exception as e:
                return f"AI Generation Error: {str(e)}\n\nFallback Report: Manual review required for {asset_name}."
        else:
            # Mocked response if no API Key
            return f"""
# VaultVision Risk Analysis Report
**Asset:** {asset_name}
**Status:** {risk_level} Risk Detected

**Analysis:**
The AI detection system identified a {similarity_score:.2%} match with official content. 
This indicates a potential unauthorized distribution of copyrighted sports media.

**Actionable Evidence:**
- Primary match detected in high-resolution vector space.
- Temporal signature recorded at {datetime.now().strftime('%H:%M:%S')}.

**Recommended Actions:**
1. Issue a DMCA takedown request to the hosting platform.
2. Flag this user for repeat infringement monitoring.
            """
