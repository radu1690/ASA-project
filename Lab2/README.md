# Assignment 2 (Radu Loghin 229368)
This is the first implementation of my scenario. All the new files are in the folder src/myworld/.  
All the rooms and all the devices have been added along with some sensors. The output log will be a little verbose because all the sensors and all the devices are logging for now.  
A simulation can be executed with "node src/myworld/scenario.js"
## Devices
All devices have been added by extending the observable class:
* Light
* Roller_shutter
* Dishwasher
* Washing_machine
* Television
* Speaker
* Oven
* Fridge

## Sensors
The sensors are created by extending Intention/goal classes like in the provided example of light.
* LightSensor (same as the example)
* IlluminationSensor (detects changes  sunIllumination of a room)
* ActivitySensor (detects changes of the  activity of a person, for now either sleeping, awake, watching_television)
* PresenceSensor (detects if there is someone in a room)
* PowerSensor (detects changes on the global power consumption of the house)

## Other classes
* House 
* Room (every room has a reference to its devices)
* Person
* scenario (main file)
* map (this class is used to detect a path when moving between rooms, still need to understand if we need to simulate the movement between multiple rooms)