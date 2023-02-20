import React from 'react';
import "../../css/landingpage.css"
import Information_1 from "../../assets/images/perahu.png"
import Information_2 from "../../assets/images/hutan.png"
import ContainerDonate from './ContainerDonate';

const Home = () => {
    return (
    <>
        <section className='main-container1'>
            <div className="main-content">
                <div className="information-1">
                    <p className='text-light fw-bold'>While you are still standing, try to reach out to the people who are falling.</p>
                </div>
                <div className="information-2">
                    <p className="text-light">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat inventore aut dolorum quis, doloribus quae, beatae dolor exercitationem expedita omnis recusandae maiores. Suscipit vitae quidem porro, optio alias necessitatibus ipsam. At saepe, officiis dolorum inventore eveniet, corrupti magni repellat ea magnam provident quidem laboriosam enim labore! Non voluptates a saepe.
                    </p>
                </div>
                <div>
                    <button className="donate-now text-danger fw-bold">
                        Donate Now
                    </button>
                </div>
            </div>
                <div className="image-information1">
                    <img src={Information_1} height="540px" width="450px" />
                </div>
        </section>
        <section className="second-container">
            <div className="image-information2">
                <img src={Information_2} alt="" />
            </div>
            <div className="main-content2">
                <div className="top-side">
                    <p>Your donation is very helpful for people affected by forest fires in Kalimantan</p>
                </div>
                <div className="side-to-side">
                    <div className="left-side">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At quam commodi id quia, sed eius fugit enim ullam optio, nisi quae repellendus autem! Omnis voluptatibus beatae ut explicabo sed nemo eaque? Sint vitae autem reprehenderit voluptatibus amet officia architecto iure culpa nihil? Fugiat, aperiam, provident impedit repellendus labore eius, amet aliquam omnis voluptates laboriosam animi quidem quibusdam veritatis assumenda dolores reprehenderit neque saepe vel soluta maxime. Officia temporibus odit debitis.
                        </p>
                    </div>
                    <div className="right-side">
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi totam impedit delectus dolores architecto nemo esse eligendi officiis. Tenetur, iste aspernatur! Libero reiciendis nostrum vitae optio numquam fuga error harum est quam dignissimos non ut id modi beatae quo sapiente cumque, maxime alias laboriosam quos consequatur minus nihil. Iste, quibusdam?
                        </p> 
                    </div>
                </div>
            </div>
        </section>
    </>
    );
};

export default Home;