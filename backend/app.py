from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# from cube_scanner.scanner import scan_one_face
from cube_solver import solve_cube

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    #     "https://rubiks-cube-solver-deployable.vercel.app"
    # ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SolveRequest(BaseModel):
    cube_string: str

# @app.post("/scan-face")
# def scan_face():
#     colors = scan_one_face()
#     return {"colors": colors}

@app.post("/solve")
def solve(req: SolveRequest):
    return solve_cube(req.cube_string)
