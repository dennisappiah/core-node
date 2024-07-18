

myfunc() {
    x=20
    y=35
    echo $(($x+$y))

    echo $1 | tr ' ' '\n'

    echo $PATH | tr ':' '\n'
}

# calling the function with first argument
myfunc "this is some string"