import Head from "next/head";
import styles from "../styles/Home.module.css";
import { connectToDatabase } from "../utils/mongodb";
import { useReducer } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { reducer, defaultState } from "../reducer/reducer";
export default function Home({ quotes }) {
  const [quoteState, dispatch] = useReducer(reducer, defaultState);

  return (
    <div className={styles.container} style={{ background: quoteState.color }}>
      <Head>
        <title>Random Quote Generator</title>
      </Head>
      <TransitionGroup>
        <CSSTransition
          key={quoteState.index}
          classNames="quoteTransitions"
          timeout={1000}
        >
          <div className={styles.quoteBox} id="quote-box">
            <div className={styles.quote} id="text">
              <p style={{ color: quoteState.color }}>
                <FontAwesomeIcon
                  icon={faQuoteLeft}
                  style={{ color: quoteState.color }}
                />{" "}
                {quotes[quoteState.index].quote}
              </p>
            </div>
            <div className={styles.footer}>
              <div className={styles.footer_top}>
                <a href="http://twitter.com/intent/tweet" id="tweet-quote">
                  <FontAwesomeIcon
                    icon={faTwitter}
                    style={{ color: quoteState.color }}
                  />
                </a>
                <p
                  className={styles.author}
                  id="author"
                  style={{ color: quoteState.color }}
                >
                  -{quotes[quoteState.index].author}
                </p>
              </div>
              <div className={styles.footer_bottom} key={quoteState.index}>
                <button
                  className={styles.btn}
                  id="new-quote"
                  onClick={() => {
                    dispatch({ type: "getQuote", payload: quotes.length });
                  }}
                  style={{ borderColor: quoteState.color }}
                >
                  Next Quote
                </button>
              </div>
            </div>
          </div>
        </CSSTransition>
      </TransitionGroup>
      <style jsx>{`
        .quoteTransitions-enter {
          opacity: 0;
          transform: translate(-50%, -50%) rotate(-90deg);
        }

        .quoteTransitions-enter.quoteTransitions-enter-active {
          opacity: 1;
          transform: translate(-50%, -50%);
          transition: 500ms linear 500ms;
        }

        .quoteTransitions-exit {
          opacity: 1;
          transform: translate(-50%, -50%);
        }

        .quoteTransitions-exit.quoteTransitions-exit-active {
          opacity: 0;
          transform: translate(-50%, -50%) rotate(90deg);
          transition: 500ms linear 1ms;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();

  const data = await db.collection("quotes").find().toArray();

  const quotes = data.map((quote) => {
    return {
      index: quote.index,
      quote: quote.quote,
      author: quote.author,
    };
  });
  return {
    props: { quotes },
  };
}
