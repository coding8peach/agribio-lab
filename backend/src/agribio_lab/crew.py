from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from crewai.agents.agent_builder.base_agent import BaseAgent
from pydantic import BaseModel
from crewai_tools import SerperDevTool
from agribio_lab.models import (
    RefinedConcepts, MentorReview
)
# If you want to run a snippet of code before or after the crew starts,
# you can use the @before_kickoff and @after_kickoff decorators
# https://docs.crewai.com/concepts/crews#example-crew-class-with-decorators


@CrewBase
class AgribioLab():
    """AgribioLab crew"""

    agents: list[BaseAgent]
    tasks: list[Task]

    # Learn more about YAML configuration files here:
    # Agents: https://docs.crewai.com/concepts/agents#yaml-configuration-recommended
    # Tasks: https://docs.crewai.com/concepts/tasks#yaml-configuration-recommended
    
    # If you would like to add tools to your agents, you can learn more about it here:
    # https://docs.crewai.com/concepts/agents#agent-tools
    @agent
    def student(self) -> Agent:
        return Agent(
            config=self.agents_config['student'], # type: ignore[index]
            verbose=True
        )

    @agent
    def researcher(self) -> Agent:
        return Agent(
            config=self.agents_config['researcher'], # type: ignore[index]
            verbose=True,
            tools=[SerperDevTool()]
        )
    
    @agent
    def innovation_specialist(self) -> Agent:
        return Agent(
            config=self.agents_config['innovation_specialist'], # type: ignore[index]
            verbose=True,
            tools=[SerperDevTool()]
        )
    
    @agent
    def agribio_specialist(self) -> Agent:
        return Agent(
            config=self.agents_config['agribio_specialist'], # type: ignore[index]
            verbose=True
        )

    @agent
    def mentor(self) -> Agent:
        return Agent(
            config=self.agents_config['mentor'], # type: ignore[index]
            verbose=True
        )

    # To learn more about structured task outputs,
    # task dependencies, and task callbacks, check out the documentation:
    # https://docs.crewai.com/concepts/tasks#overview-of-a-task
    @task
    def student_profile_task(self) -> Task:
        return Task(
            config=self.tasks_config['student_profile_task'], # type: ignore[index]
            output_file='output/student.md'
        )

    @task
    def specialist_idea_task(self) -> Task:
        return Task(
            config=self.tasks_config['specialist_idea_task'], # type: ignore[index]
            output_file='output/specialist.md'
        )
    
    @task
    def innovation_idea_task(self) -> Task:
        return Task(
            config=self.tasks_config['innovation_idea_task'], # type: ignore[index]
            output_file='output/innovation.md'
        )
    
    @task
    def research_task(self) -> Task:
        return Task(
            config=self.tasks_config['research_task'], # type: ignore[index]
            output_file='output/researcher.md',
            # output_pydantic=ResearchConcept,
        )

    @task
    def refinement_task(self) -> Task:
        return Task(
            config=self.tasks_config['refinement_task'], # type: ignore[index]
            # output_file='output/refinement.md'
            output_pydantic=RefinedConcepts,
        )

    @task
    def mentor_task(self) -> Task:
        return Task(
            config=self.tasks_config['mentor_task'], # type: ignore[index]
            # output_file='output/mentor.md'
            output_pydantic=MentorReview,
        )
    
    @crew
    def crew(self) -> Crew:
        """Creates the AgribioLab crew"""
        # To learn how to add knowledge sources to your crew, check out the documentation:
        # https://docs.crewai.com/concepts/knowledge#what-is-knowledge

        return Crew(
            agents=self.agents, # Automatically created by the @agent decorator
            tasks=self.tasks, # Automatically created by the @task decorator
            process=Process.sequential,
            verbose=True,
            # process=Process.hierarchical, # In case you wanna use that instead https://docs.crewai.com/how-to/Hierarchical/
        )
