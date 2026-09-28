import sys
from PyQt6.QtWidgets import (QApplication, QWidget, QLabel, QLineEdit, 
                             QPushButton, QVBoxLayout, QHBoxLayout, QMessageBox)
from PyQt6.QtCore import Qt, QTimer
from PyQt6.QtGui import QImage, QPixmap
import cv2

class CPPlusRTSPApp(QWidget):
    def __init__(self):
        super().__init__()
        self.initUI()
        self.cap = None

    def initUI(self):
        self.setWindowTitle("CP Plus Camera Live Viewer (RTSP)")
        self.setGeometry(100, 100, 900, 600)

        layout = QVBoxLayout()
        input_layout = QHBoxLayout()
        
        # IP Address, Username, Password inputs
        self.ip_input = QLineEdit()
        self.ip_input.setPlaceholderText("Camera/DVR IP (e.g., 192.168.1.250)")
        
        self.user_input = QLineEdit("admin")
        self.user_input.setPlaceholderText("Username")
        
        self.pass_input = QLineEdit()
        self.pass_input.setPlaceholderText("Password")
        self.pass_input.setEchoMode(QLineEdit.EchoMode.Password)

        self.btn_connect = QPushButton("Connect Live View")
        self.btn_connect.clicked.connect(self.connect_camera)

        input_layout.addWidget(self.ip_input)
        input_layout.addWidget(self.user_input)
        input_layout.addWidget(self.pass_input)
        input_layout.addWidget(self.btn_connect)

        # Video Display Screen
        self.video_label = QLabel("Enter Details and Click Connect")
        self.video_label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        self.video_label.setStyleSheet("background-color: black; color: white; font-size: 16px;")

        layout.addLayout(input_layout)
        layout.addWidget(self.video_label, stretch=1)
        self.setLayout(layout)

        # Timer to update video frames
        self.timer = QTimer()
        self.timer.timeout.connect(self.update_frame)

    def connect_camera(self):
        ip = self.ip_input.text().strip()
        user = self.user_input.text().strip()
        pwd = self.pass_input.text().strip()

        if not ip or not pwd:
            QMessageBox.warning(self, "Error", "Please enter IP Address and Password!")
            return

        self.video_label.setText("Connecting...")
        QApplication.processEvents()

        # CP Plus / Dahua standard RTSP URL format
        # channel=1 (पहला कैमरा), subtype=0 (Main Stream, High Quality)
        rtsp_url = f"rtsp://{user}:{pwd}@{ip}:554/cam/realmonitor?channel=1&subtype=0"
        
        if self.cap is not None:
            self.cap.release()

        self.cap = cv2.VideoCapture(rtsp_url)

        if not self.cap.isOpened():
            QMessageBox.critical(self, "Error", "Could not connect to camera! Check IP, Password or Network.")
            self.video_label.setText("Connection Failed")
        else:
            self.timer.start(30) # 30ms में फ्रेम अपडेट होगा (Smooth Video)

    def update_frame(self):
        if self.cap and self.cap.isOpened():
            ret, frame = self.cap.read()
            if ret:
                # Open CV BGR इमेज को RGB में बदलता है ताकि PyQt उसे दिखा सके
                frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                h, w, ch = frame.shape
                bytes_per_line = ch * w
                
                qt_img = QImage(frame.data, w, h, bytes_per_line, QImage.Format.Format_RGB888)
                pixmap = QPixmap.fromImage(qt_img)
                
                # स्क्रीन के हिसाब से वीडियो को फिट करना
                self.video_label.setPixmap(pixmap.scaled(self.video_label.size(), 
                                           Qt.AspectRatioMode.KeepAspectRatio, 
                                           Qt.TransformationMode.SmoothTransformation))

    def closeEvent(self, event):
        if self.cap and self.cap.isOpened():
            self.cap.release()
        event.accept()

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = CPPlusRTSPApp()
    window.show()
    sys.exit(app.exec())
