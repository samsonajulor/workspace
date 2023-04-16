struct point {
   int x;
   int y;
};
struct point my_point = { 3, 7 };
struct point *p = &my_point;
// To set the member y of my variable my_point to 98, I can do (select all valid answers):
p->y = 98;
(*p).y = 98;

// print the value of the member y of my variable my_point
printf("%d", p->y);