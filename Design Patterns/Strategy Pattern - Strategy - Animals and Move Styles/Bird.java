public class Bird extends Animal {

    public Bird(String name, double weight) {
        super(name, weight);
        setMoveStrategy(new Flyer()); // Birds typically fly
    }
}