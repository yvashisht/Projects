public class Game {
    public static void main(String[] args) {
        Animal cat = new Cat("Whiskers", 4.5);
        Animal dog = new Dog("Buddy", 14.0);
        Animal bird = new Bird("Tweety", 0.5);
        Animal fish = new Fish("Nemo", 0.2);

        cat.performMove(); // Outputs: Walking quickly
        dog.performMove(); // Outputs: Swimming energetically
        bird.performMove(); // Outputs: Flying high in the sky
        fish.performMove(); // Outputs: Swimming in the water
    }
}
