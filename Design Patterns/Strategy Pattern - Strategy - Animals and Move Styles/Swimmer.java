public class Swimmer implements MoveStrategy {

    @Override
    public void move(String s) {
        System.out.println("Swimming" + " " + s);
    }

}
