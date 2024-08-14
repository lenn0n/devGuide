
import useFetch from '@/hooks/useFetch';

type ClientProps = {
  client_id: number | string,
  client_name: string,
}

function Page({ error, data, message }: any) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 text-white`}
    >
      <div className="">
        {error && message}
        {data?.clients?.length > 0 &&
          data.clients.map(
            (client: ClientProps) =>
              <div key={client.client_id}>{client.client_name}</div>
          )
        }
      </div>
    </main>
  );
}

export const getServerSideProps = async () => {
  const { request } = useFetch({
    url: 'http://localhost:5000/graphql',
    cache: 'no-cache',
    method: 'GET',
    isGraphQL: true
  })

  // Using GRAPHQL
  // const data = await request(`
  //   query getClients { 
  //     clients { 
  //       client_name 
  //       client_id
  //     } 
  //   }`)

  // USING REST
  const data = await request({ client_id: 1})

  return data;
};


export default Page
