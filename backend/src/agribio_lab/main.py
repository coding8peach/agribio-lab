#!/usr/bin/env python
import sys
import warnings

from datetime import datetime

from agribio_lab.crew import AgribioLab

warnings.filterwarnings("ignore", category=SyntaxWarning, module="pysbd")

# This main file is intended to be a way for you to run your
# crew locally, so refrain from adding unnecessary logic into this file.
# Replace with inputs you want to test with, it will automatically
# interpolate any tasks and agents information

def run():
    """
    Run the crew.
    """
    inputs = {
        "interests": (
            "plant biology, sustainable agriculture, artificial intelligence, "
            "and computer vision"
        ),

        "skills": (
            "AP Biology, Python programming, basic machine learning, "
            "and basic electronics"
        ),

        "resources": (
            "access to a school greenhouse, laptop, webcam, Raspberry Pi, "
            "and common low-cost sensors"
        ),

        "duration": "12 weeks",

        "budget": "$300",

        "required_domains": (
            "The project must combine agriculture or biology with "
            "AI or machine learning."
        ),

        "preferred_features": (
            "A meaningful hardware, sensor, camera, or microcontroller "
            "component when it contributes to the scientific investigation."
        ),

        "exploration_preferences": (
            "Original data collection, emerging technology, early detection "
            "or prediction, low-cost innovation, multimodal data, and "
            "real-world applications."
        ),
    }
    
    try:
        AgribioLab().crew().kickoff(inputs=inputs)
    except Exception as e:
        raise Exception(f"An error occurred while running the crew: {e}")


def train():
    """
    Train the crew for a given number of iterations.
    """
    inputs = {
        "topic": "AI LLMs",
        'current_year': str(datetime.now().year)
    }
    try:
        AgribioLab().crew().train(n_iterations=int(sys.argv[1]), filename=sys.argv[2], inputs=inputs)

    except Exception as e:
        raise Exception(f"An error occurred while training the crew: {e}")

def replay():
    """
    Replay the crew execution from a specific task.
    """
    try:
        AgribioLab().crew().replay(task_id=sys.argv[1])

    except Exception as e:
        raise Exception(f"An error occurred while replaying the crew: {e}")

def test():
    """
    Test the crew execution and returns the results.
    """
    inputs = {
        "topic": "AI LLMs",
        "current_year": str(datetime.now().year)
    }

    try:
        AgribioLab().crew().test(n_iterations=int(sys.argv[1]), eval_llm=sys.argv[2], inputs=inputs)

    except Exception as e:
        raise Exception(f"An error occurred while testing the crew: {e}")

def run_with_trigger():
    """
    Run the crew with trigger payload.
    """
    import json

    if len(sys.argv) < 2:
        raise Exception("No trigger payload provided. Please provide JSON payload as argument.")

    try:
        trigger_payload = json.loads(sys.argv[1])
    except json.JSONDecodeError:
        raise Exception("Invalid JSON payload provided as argument")

    inputs = {
        "crewai_trigger_payload": trigger_payload,
        "topic": "",
        "current_year": ""
    }

    try:
        result = AgribioLab().crew().kickoff(inputs=inputs)
        return result
    except Exception as e:
        raise Exception(f"An error occurred while running the crew with trigger: {e}")
