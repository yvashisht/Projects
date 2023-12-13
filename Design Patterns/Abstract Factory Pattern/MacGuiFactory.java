public class MacGuiFactory implements GuiFactory {

    protected Button b;
    protected Menu m;
    // protected Scrollbar s;

    @Override
    public Button createButton(String label) {
        b = new MacButton(label);
        return b;
    }

    @Override
    public Menu createMenu() {
        m = new MacMenu();
        return m;
    }

}
