import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import { useState } from "react";

export default function SignedIn({ joke }: InferGetServerSidePropsType<typeof getServerSideProps>) {

  // state for whether to show punchline or not
  const [showPunchline, setShowPunchline] = useState(false);

  // handler for when the show punchline button is pressed
  const togglePunchline = () => {
    setShowPunchline(!showPunchline);
  };


  return (
    <div>
      <h1>Signed In</h1>
      {/* Task 3: Your own presentation of the joke here (Free Style 😉 )*/}
      <div style={jokeStyle}>
        <p style={setupStyle}>{joke.setup}</p>
        {showPunchline && <p style={punchlineStyle}>{joke.punchline}</p>}
        <button style={buttonStyle} onClick={togglePunchline}>
          {showPunchline ? 'Hide Punchline' : 'Show Punchline'}
        </button>
      </div>
      {/* End of Task 3 */}
    </div>
  )

}

// Task 2: Fetch random jokes from the API
// https://official-joke-api.appspot.com/jokes/programming/random
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from external API and pass it to the page via props.joke

  const res = await fetch(`https://official-joke-api.appspot.com/jokes/programming/random`)
  const data = await res.json()
  const joke = data[0]

  return {
    props: {
      joke: {
        setup:joke.setup,
        punchline:joke.punchline
      },
    }, // will be passed to the page component as props
  }
}

const jokeStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  border: '1px solid black',
  borderRadius: '5px',
  marginBottom: '20px',
};

const setupStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '10px',
};

const punchlineStyle = {
  fontSize: '18px',
  marginTop: '10px',
};

const buttonStyle = {
  backgroundColor: '#0070f3',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  padding: '10px',
  marginTop: '10px',
  cursor: 'pointer',
};