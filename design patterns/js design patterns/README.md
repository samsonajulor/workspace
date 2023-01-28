# backend/js-design-patterns

1. SOLID Principles
- single responsibility principle: A class should have only one responsibility and as such only one reason to change. It is also known as separation of concerns. This makes the entire system easier to manage.
- open closed principle: Objects are open for extension and closed for modification. This leads to state space explosion. You need to use Specification Pattern.
- liskov substitution principle: If a method accepts a base type, it should also be able to accept a derived type.
- interface segregation principle: Split interfaces into parts so people do not implement more than what they need. Always obey YAGNI - You Ain't Going to Need It.
- dependency inversion principle: This defines a relationship between low level modules and high level modules. High level modules should not depend on low level modules use abstractions instead and have everything done through abstractions

## GAMMA CATEGORIZATION

 1. Creational Patterns: Deals with the creation of objects
 - single statement creation vs. piecewise creation
 - explicit or constructor vs dependency injection or implicit

 2. Structural Patterns: deals with the structure of class members
 - many patterns are wrappers that mimic the underlying class interface
 - stress the importance of good api design

 3. Behavioral Patterns: They solve a particular problem in a particular way.


### Creational Design Patterns
1. Builder: This provides an api for building complicated objects succinctly
- Some objects require a lot of ceremony to create.
- They may have up to to 10 or more initializer objects
- They need to be built piece by piece via an api
2. Factories:

3. Prototype: This is an existing (partially of fully constructed) design.
- Complicated objects are not designed from scratch. Existing designs are reiterated
- We make a deep copy of the prototype and customize it.
- We can make the cloning convenient.