import Head from "next/head";

const Error = () => {
  return (
    <>
      <Head>
        <title>Error Page</title>
      </Head>
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-red text-4xl">Error</h1>
      </div>
    </>
  );
};

export default Error;