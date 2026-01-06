import kociemba
from utils.move_explainer import explain_solution

def solve_cube(cube_string):
    try:
        print("Solving cube_string:", cube_string)
        solution = kociemba.solve(cube_string)
        print("Solution found:", solution)
        steps = explain_solution(solution)

        return {
            "success": True,
            "solution": solution,
            "steps": steps
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }
