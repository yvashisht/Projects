import './contact.css';

const Contact = () => {
    const email = "yajur.vashisht@ucalgary.ca";

    return (
        <section id="contact">
            <h2>Contact</h2>
            <p>If you'd like to get in touch, feel free to <a href={`mailto:${email}`}>email me</a></p>
            <p>The socials above also work!</p>
        </section>
    );
};

export default Contact;
