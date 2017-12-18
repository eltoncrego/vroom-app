# Vroom Team Maintenance Input
This documentation provides centralized standards on how/what to input when adding a car's maintenance schedule

## Frequency of Input
1 car's full maintenance schedule per day for the foreseeable future.
You can input more than this per day if you would like (preferrable).

## Task Naming Convention
Uniformity between the different task names with no fluff.
Describes the type of task and object associated with the task.

<p align="center"><img src="https://github.com/eltoncrego/vroom-app/blob/master/documentation/assets/task_naming_convention_image.png?raw=true" width="500"></p>

## Task Fields
9 standard fields per task:
* action: adjust || replace || check || install
* intervalMileage: (number of miles that accumulates in between subsequent tasks) || none
* intervalMonth: (number of months that accumulates in between subsequent tasks) || none
* item: (item/object that this tasks is related to)
* itemDescription: (a brief description of what the item is/what role it plays)
* itemDisplayDescription: (same as itemDescription but will be displayed in-app (user-facing))
* itemSteps: (list of steps in chronological order needed to complete the task)
* severity: low || mild || moderate || high

<p align="center"><img src="https://github.com/eltoncrego/vroom-app/blob/master/documentation/assets/task_fields_convention_image.png?raw=true" width="500"></p>



