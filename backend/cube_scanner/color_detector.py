import cv2
import numpy as np

COLOR_RANGES = {
    "white":  ((0, 0, 200), (180, 50, 255)),
    "yellow": ((20, 100, 100), (35, 255, 255)),
    "red1":   ((0, 100, 100), (10, 255, 255)),
    "red2":   ((160, 100, 100), (180, 255, 255)),
    "green":  ((40, 50, 50), (80, 255, 255)),
    "blue":   ((100, 150, 50), (130, 255, 255)),
    "orange": ((10, 100, 100), (20, 255, 255))
}

def classify_color(bgr_pixel):
    hsv = cv2.cvtColor(
        np.uint8([[bgr_pixel]]), cv2.COLOR_BGR2HSV
    )[0][0]

    for color, (low, high) in COLOR_RANGES.items():
        if all(low[i] <= hsv[i] <= high[i] for i in range(3)):
            return color.replace("1", "").replace("2", "")

    return "unknown"
