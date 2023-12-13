public class Dog extends Animal {

    public Dog(String name, double weight) {
        super(name, weight);
        setMoveStrategy(new Swimmer()); // Dogs might be set to swim
    }
}