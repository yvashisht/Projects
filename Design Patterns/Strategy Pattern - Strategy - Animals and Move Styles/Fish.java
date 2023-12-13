public class Fish extends Animal {

    public Fish(String name, double weight) {
        super(name, weight);
        setMoveStrategy(new Swimmer()); // Fish swim
    }
}
