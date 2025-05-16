*Flood Prediction Using Machine Learning*

Overview

This project focuses on predicting flood occurrences using machine learning techniques. By analyzing key environmental factors, the model aims to provide timely and accurate flood risk assessments.

Features

Synthetic Dataset Generation: Creates a balanced dataset with 50% flood occurrences based on environmental thresholds.

Machine Learning Models: Implements Random Forest and XGBoost classifiers for prediction.

Web Interface: Provides a user-friendly interface for inputting environmental data and viewing predictions.

Dataset Generation

The dataset is synthetically generated to simulate real-world environmental conditions. Key features include:


Rainfall (mm): Simulated using an exponential distribution with a scale of 50.

Temperature (°C): Generated from a normal distribution centered at 30°C with a standard deviation of 5.

Humidity (%): Derived from a normal distribution centered at 70% with a standard deviation of 15.

Wind Speed (km/h): Generated from a normal distribution centered at 10 km/h with a standard deviation of 3.


A flood occurrence is labeled based on the following risk criteria:


Rainfall > 100 mm

Humidity > 85%

Temperature > 35°C

Wind Speed > 20 km/h

If at least two of these conditions are met, the instance is labeled as a flood occurrence.


Model Training

The project utilizes two machine learning models:


Random Forest Classifier: An ensemble learning method that constructs multiple decision trees and outputs the mode of their predictions.


XGBoost Classifier: An optimized gradient boosting algorithm known for its performance and efficiency.


Both models are trained on the synthetic dataset and evaluated for accuracy and reliability.

Web Application

A Flask-based web application is developed to allow users to input environmental parameters and receive flood risk predictions. The interface is designed for ease of use and quick assessments.
