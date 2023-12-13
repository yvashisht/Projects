public class Cat extends Animal {

    public Cat(String name, double weight) {
        super(name, weight);
        setMoveStrategy(new Walker()); // Cats typically walk
    }
}
