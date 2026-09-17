from pydantic import BaseModel


class ResearchRequest(BaseModel):
    interests: str
    skills: str
    resources: str
    duration: str
    budget: str
    required_domains: str
    preferred_features: str
    exploration_preferences: str


class ResearchConcept(BaseModel):
    title: str
    biological_problem: str
    real_world_scenario: str

    research_question: str
    hypothesis: str

    experimental_manipulation: str
    data_collection: list[str]

    external_conditions: list[str]

    ai_role: str
    ai_actions: list[str]

    hardware: list[str]

    baseline: str
    validation: str

    source_candidate_ideas: list[str]
    research_evidence: list[str]

    distinctiveness: str
    unresolved_questions: list[str]


class RefinedConcepts(BaseModel):
    concepts: list[ResearchConcept]

class ConceptReview(BaseModel):
    title: str
    research_question: str

    scientific_interest: str

    strengths: list[str]
    weaknesses: list[str]

    scientific_depth: str
    ai_ml_depth: str
    experimental_depth: str
    feasibility: str

    original_data_potential: str
    major_risks: list[str]

    recommended_scope_changes: list[str]
    minimum_viable_version: str
    stretch_version: str

    skills_to_learn: list[str]
    preliminary_work_needed: list[str]


class MentorReview(BaseModel):
    reviews: list[ConceptReview]
    concepts_for_further_investigation: list[str]
    questions_to_resolve: list[str]
