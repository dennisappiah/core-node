#include <stdio.h>


int main(){
    int a = 45;

    // int pointer - address of the a variable
    int * myptr = &a;

    // allocating 12 bytes of memory -> malloc returns a pointer the first element adddress
    // memory is considered an array of bits
    int * allocated_memory = malloc(12); 
    allocated_memory[0] = 0xf45;


    return 0;
}