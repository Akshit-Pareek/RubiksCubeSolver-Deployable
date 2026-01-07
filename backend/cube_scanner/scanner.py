import cv2
import numpy as np

def draw_grid(frame, grid_size=3, margin=80):
    h, w, _ = frame.shape
    size = min(h, w) - 2 * margin
    start_x = (w - size) // 2
    start_y = (h - size) // 2
    cell = size // grid_size

    boxes = []
    for i in range(grid_size):
        for j in range(grid_size):
            x1 = start_x + j * cell
            y1 = start_y + i * cell
            x2 = x1 + cell
            y2 = y1 + cell
            boxes.append((x1, y1, x2, y2))

    return boxes


def classify_color(bgr):
    hsv = cv2.cvtColor(np.uint8([[bgr]]), cv2.COLOR_BGR2HSV)[0][0]
    h, s, v = hsv

    if v > 200 and s < 40:
        return "white"
    if h < 10 or h > 170:
        return "red"
    if 10 < h < 20:
        return "orange"
    if 20 < h < 35:
        return "yellow"
    if 40 < h < 85:
        return "green"
    if 90 < h < 130:
        return "blue"
    return "unknown"


def extract_colors(frame):
    boxes = draw_grid(frame)
    colors = []

    for (x1, y1, x2, y2) in boxes:
        cx = (x1 + x2) // 2
        cy = (y1 + y2) // 2
        patch = frame[cy-10:cy+10, cx-10:cx+10]
        avg_color = np.mean(patch.reshape(-1, 3), axis=0)
        colors.append(classify_color(avg_color))

    return colors
