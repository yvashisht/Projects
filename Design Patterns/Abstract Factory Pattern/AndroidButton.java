class AndroidButton extends Button {

    public AndroidButton(String type) {
        paint(type);
    }

    public void paint(String type) {
        System.out.println(type + " created.");
    }

}