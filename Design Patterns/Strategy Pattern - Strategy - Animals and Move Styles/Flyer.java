public class Flyer implements MoveStrategy {

    @Override
    public void move(String s) {
        System.out.println("Flying" + " " + s);
    }

}
