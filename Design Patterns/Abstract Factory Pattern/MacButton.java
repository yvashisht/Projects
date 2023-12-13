class MacButton extends Button {

    public MacButton(String type) {
        paint(type);
    }

    public void paint(String type) {
        System.out.println(type + " created.");
    }

}
