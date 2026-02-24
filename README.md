## 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

### ANSWER:

- getElementById --> gets element from the given ID
- getElementsByClassName --> gets element from the given Class
- querySelector --> Can get both ID and Class just like css
- querySelectorAll --> Gives and object from class and gives access to HTML elements
  as well as a single element

## 2. How do you create and insert a new element into the DOM?

### ANSWER:

- Using the createElement(""); we can create any new element in DOM

## 3. What is Event Bubbling? And how does it work?

### ANSWER:

when ever any particular element is clicked on html element
it automatically clicks all the parent elements as well
so, if i click on a element with in a DIV it will automatically click on the div as well

## 4. What is Event Delegation in JavaScript? Why is it useful?

### ANSWER:

Any event that happens to the parent gets passed down to the childrens
it helps to resuce code
so, each time the parent is clicked
it automatically runs the given code for child

## 5. What is the difference between preventDefault() and stopPropagation() methods?

### ANSWER:

- preventDefault() --> it doesnt do the default action when a particular action is called
- stopPropagation() --> it stops Event Bubbling
