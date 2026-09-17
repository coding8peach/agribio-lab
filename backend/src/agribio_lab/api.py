from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from agribio_lab.crew import AgribioLab
from agribio_lab.models import ResearchRequest

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://agribio-lab.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/research-projects")
def create_research_projects(request: ResearchRequest):

    inputs = request.model_dump()

    result = AgribioLab().crew().kickoff(
        inputs=inputs
    )

    return result.pydantic