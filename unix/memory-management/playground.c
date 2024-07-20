#include <stdio.h>

struct Object
{
    /* data */
    const char *name;  //string
};

// function accepts 1. struct pointer to the struct Object, and 2. int pointer to number
void modify(struct Object *o, int *n){
    // Deferencing the value
  (*o).name = "Dylan";

   *n = 1000;
}

int main() {
    struct Object obj;
    obj.name = "Joe";
    int num = 700;

    printf("Before modification\n");
    printf("name%s\n", obj.name);
    printf("number %d\n", num);

    //modify
    modify(&obj, &num);

    printf("After modification\n");
    printf("name%s\n", obj.name);
    printf("number %d\n", num);
}