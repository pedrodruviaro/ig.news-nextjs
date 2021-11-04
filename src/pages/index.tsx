import Head from "next/head";
import { SubscribeButton } from "../components/SubscribeButton";
import styles from "./home.module.scss";
import { GetStaticProps } from "next";
import { stripe } from "../services/stripe";

interface HomeProps {
    product: {
        priceId: string;
        amount: number;
    };
}

export default function Home({ product }: HomeProps) {
    return (
        <>
            <Head>
                <title>Home | ig.news</title>
            </Head>

            <main className={styles.contentContainer}>
                <section className={styles.hero}>
                    <span>👏 Hey, welcome</span>
                    <h1>
                        News about the <span>React</span> world.
                    </h1>
                    <p>
                        Get access to all the publications <br />
                        <span>for {product.amount} month</span>
                    </p>

                    <SubscribeButton priceId={product.priceId} />
                </section>

                {/*eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/avatar.svg" alt="Girl codding" />
            </main>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    // produtos => api id
    const price = await stripe.prices.retrieve(
        "price_1Js5e8IdGc1E5AEIyMOfPyZR"
    );

    const product = {
        priceId: price.id,
        amount: new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(price.unit_amount / 100), //vem emcentavos => divide por 100
    };

    return {
        props: {
            product,
        },
        revalidate: 60 * 60 * 24, //24 hours
    };
};
