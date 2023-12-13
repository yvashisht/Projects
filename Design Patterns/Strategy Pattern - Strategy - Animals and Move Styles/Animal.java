public abstract class Animal {

    private String name;
    private double weight;
    private MoveStrategy moveStyle;

    public Animal(String name, double weight) {
        this.name = name;
        this.weight = weight;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public void setMoveStrategy(MoveStrategy moveStyle) {
        this.moveStyle = moveStyle;
    }

    public void performStrategy() {
        moveStyle.move(name);
    }
}