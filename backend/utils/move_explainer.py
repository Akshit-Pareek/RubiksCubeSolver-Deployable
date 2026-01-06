MOVE_EXPLANATION = {
    "R":  "Turn the right face 90 degrees clockwise.",
    "R'": "Turn the right face 90 degrees counter-clockwise.",
    "R2": "Turn the right face 180 degrees.",

    "L":  "Turn the left face 90 degrees clockwise.",
    "L'": "Turn the left face 90 degrees counter-clockwise.",
    "L2": "Turn the left face 180 degrees.",

    "U":  "Turn the upper face 90 degrees clockwise.",
    "U'": "Turn the upper face 90 degrees counter-clockwise.",
    "U2": "Turn the upper face 180 degrees.",

    "D":  "Turn the bottom face 90 degrees clockwise.",
    "D'": "Turn the bottom face 90 degrees counter-clockwise.",
    "D2": "Turn the bottom face 180 degrees.",

    "F":  "Turn the front face 90 degrees clockwise.",
    "F'": "Turn the front face 90 degrees counter-clockwise.",
    "F2": "Turn the front face 180 degrees.",

    "B":  "Turn the back face 90 degrees clockwise.",
    "B'": "Turn the back face 90 degrees counter-clockwise.",
    "B2": "Turn the back face 180 degrees."
}

def explain_solution(solution_str):
    moves = solution_str.split()
    steps = []

    for i, move in enumerate(moves, start=1):
        steps.append({
            "step": i,
            "move": move,
            "description": MOVE_EXPLANATION.get(move, "Unknown move")
        })

    return steps
