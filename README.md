# Final Project 2 (Radu Loghin 229368)
This is the final delivery for the Autonomous Software Agents project. 
First run ```npm install``` to install all dependencies.  

The main scenario can be executed from the Project folder with:  
```node src/project/scenarios/main_Scenario.js ```  

There are 3 other additional scenarios where specific goals can be tested.

## Devices
There are two type of devices: (normal) device and washing device (both extend the Observable class). Washing devices have specific methods which simulate a washing cycle.
* ```Device``` Light
* ```Device``` Roller_shutter
* ```WashingDevice``` Dishwasher
* ```WashingDevice``` Washing_machine
* ```Device``` Television
* ```Device``` Speaker
* ```Device``` Oven
* ```Device``` Fridge

## Sensors
Sensors observe the world and update the beliefs of the agents:
* ```ActivitySensor``` observes the people of the hosue
* ```DeviceStatusSensor``` observes the status of devices
* ```FridgeSensor``` keeps track of the supplies of the fridge
* ```PowerSensor``` observes the global power consumption and checks if a washing device is safe to start
* ```ShutterSensor``` observes the status of the roller shutters
* ```SunIlluminationSensor``` observes the illumination from the outside 
* ```VacuumCleanerSensor``` checks if rooms are clean, the location of the vacuum cleaner robot and its battery status
* ```WashingDeviceSensor``` checks if washing devices are ready to begin/resume a washing cycle

## Other classes
* ```House``` here all the rooms and devices are initialized 
* ```Room``` 
* ```Person```
* ```map``` this class is used to check the correct movement of the vacuum cleaner robot
* ```data``` contains the configuration of power consumption for each device. It contains also all the facts which are used by the agents.

## Goals
* ```LightGoals``` turn on/off the lights
* ```ShutterGoals``` set the shutters up/half/down
* ```TelevisionGoals``` switch off the television when not needed
* ```WashingMachineGoals``` start/resume/pause the washing machine
* ```DishWasherGoals``` start/resume/pause the dishwasher
* ```NotificationGoals``` notify when a washing device finished and when the supplies of the fridge are low


# Logs
To save a log file, run a scenario with:  
```node src/project/scenarios/main_Scenario.js > app.log```  
then run ```node pretty_log.js``` to obtain a better output.log