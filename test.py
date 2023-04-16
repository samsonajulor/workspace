# class Base():
#     """ My base class """

#     __nb_instances = 0

#     def __init__(self):
#         Base.__nb_instances += 1
#         self.id = Base.__nb_instances

# class User(Base):
#     """ My User class """

#     def __init__(self):
#         super().__init__()
#         self.id = 89

# u = User()
# print(u.id)

# class User:
#     id = 1

# u = User()
# User.id = 98
# print(u.id)

# class User:
#     id = 89
#     name = "no name"
#     __password = None
    
#     def __init__(self, new_name=None):
#         self.is_new = True
#         if new_name is not None:
#             self.name = new_name

# u = User()
# u.name

# this is a documentation comment
#!/usr/bin/python3
# """ 
#     My calculation module
# """
# import sys

class Base():
    """ My base class """

    __nb_instances = 0

    def __init__(self):
        Base.__nb_instances += 1
        self.id = Base.__nb_instances

class User(Base):
    """ My User class """

    def __init__(self):
        super().__init__()
        self.id += 99

u = User()
print(u.id)