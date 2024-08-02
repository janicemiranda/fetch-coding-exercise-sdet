Feature: Fetch Coding Exercise - SDET

  Scenario: Find the fake gold bar
    Given I am on the Challenge page
    And there are 9 gold bars
    When I divide the gold bars into 3 stacks
    And I add the first stack to the left bowl
    And I add the second stack to the right bowl
    Then I click on the Weigh button
    When I locate the group containing the fake bar
    Then I click on the Reset button
    When I set two of the remaining three bars on the bowls
    Then I click on the Weigh button
    When I identify the fake bar
    Then I click on the fake bar
    And I should see the alert "Yay! You find it!"
