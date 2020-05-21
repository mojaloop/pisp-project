Feature: Template addiction

Scenario: Adding two arguments
  Given Template and two arguments: A=1 and B=2
  When I add A and B
  Then The result should be C=3

Scenario: Checking index module layout
  Given Index module
  When I have default imported Index type
  Then The imported Index is type object