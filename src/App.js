import "./App.css";
import { useState, useEffect } from "react";
// const sampleBlogs = [
//   {
//     createdAt: "2022-06-30T04:03:07.069Z",
//     author: "Marion Roberts DDS",
//     text: "Vitae quaerat nostrum dolor. Eius non totam autem unde ea consequatur quia. Laborum exercitationem sed.\nQui quam corrupti voluptatem autem. Voluptatum in et voluptas quisquam id doloremque nostrum unde. Consequuntur ea qui.\nSed consequuntur voluptas nemo ea laborum neque distinctio quo iusto. Temporibus aut quisquam. Laboriosam fugit eum sint corporis sequi minus iste molestiae quos. Quae aut earum quasi facilis hic et.",
//     title: "sapiente",
//     id: "1",
//   },
//   {
//     createdAt: "2022-06-30T04:16:20.950Z",
//     author: "Dr. Martha Herman",
//     text: "Et consequatur earum et in quam. Tenetur ipsam dolores. Eius aperiam est.\nRerum laborum ut. Accusantium amet qui impedit laudantium. Aut et minus perspiciatis voluptates. Mollitia modi maiores non. Qui animi assumenda distinctio repellendus reiciendis tenetur esse quia magnam. Quo natus minus sed.\nEa quod nulla hic est et libero enim et. Occaecati voluptas ut minus impedit aperiam. Dolore atque cumque ut accusamus enim. Dicta qui minima et doloremque quam veniam voluptatibus. Nihil repellat et. Laboriosam quia voluptatem.",
//     title: "nemo",
//     id: "2",
//   },
//   {
//     createdAt: "2022-06-30T09:57:45.633Z",
//     author: "Francis McDermott",
//     text: "Consequatur nostrum adipisci doloribus commodi. Dolore enim minus. Assumenda sint molestiae. Voluptatem repellat ad. Quasi incidunt accusantium ipsum voluptate aut modi.\nSed id labore recusandae commodi. Ullam neque ab. At similique veritatis. Voluptas similique deserunt nihil praesentium qui. Dolore velit ea doloremque quae quo modi.\nOccaecati id nobis architecto ut beatae et. Consequuntur aut eveniet cum optio. Non dolores asperiores optio consequatur sequi.",
//     title: "omnis",
//     id: "3",
//   },
//   {
//     createdAt: "2022-06-30T01:29:57.446Z",
//     author: "Miss Rickey Schmidt",
//     text: "In corrupti adipisci. Qui eaque voluptatem at. Libero et omnis ullam. Soluta quas provident iste autem quae saepe et dolor.\nDolores quos voluptate quibusdam qui harum inventore. Quae pariatur reprehenderit dignissimos non qui itaque veniam quod magni. Deserunt veritatis qui natus eligendi. Aut adipisci eum voluptatem libero similique. Aut delectus nam. Ullam dolor nostrum consectetur aut sit illum magni.\nCum nemo harum earum sed. Nobis et in cumque placeat. Odio alias sint ab. Ratione amet fuga vitae aut dolorum.",
//     title: "expedita",
//     id: "4",
//   },
//   {
//     createdAt: "2022-06-29T19:17:08.325Z",
//     author: "Marcella Jacobson",
//     text: "Voluptatibus laboriosam culpa ut aut ea ipsum alias itaque. Placeat qui et. Quam ipsa non unde fugiat cupiditate dignissimos.\nUt ut rerum veniam sit deserunt. Molestiae ut quis molestiae quis autem aliquid. Non beatae sequi minus voluptatem enim accusantium quia dolorem.\nDolorum vel aperiam est pariatur id. Sunt et nam. Sit eligendi dolorem ullam dicta quo ipsa omnis. Assumenda accusantium tempora qui temporibus cum rerum error necessitatibus. Nisi consectetur fuga qui nisi eaque maxime quia pariatur.",
//     title: "similique",
//     id: "5",
//   },
// ];

const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [urlParamString, setUrlParamString] = useState("")

  useEffect(() => {
    const fetchBlogs = async () => {
      const result = await fetch(
        `${urlEndpoint}/blogs${urlParamString}`
      );
      const blogs = await result.json();
      setBlogs(blogs);
    };
    fetchBlogs();
  }, [urlParamString]);

  const generateUrlParams = (limit, page, sortBy, order) => {
    let urlParams = "?"
    if (limit && page) {
      urlParams += `limit=${limit}&page=${page}&`
    }
    if (sortBy && order) {
      urlParams += `sortBy=${sortBy}&order=${order}&`
    }
    setUrlParamString(urlParams.slice(0, -1))
  }

  return (
    <div className="App-header">
      <OptionBar generateUrlParams={generateUrlParams}/>
      <BlogList blogs={blogs}/>
    </div>
  );
}

const OptionBar = (props) => {

  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState("")
  const [order, setOrder] = useState("")

  useEffect(() => {
    props.generateUrlParams(limit, page, sortBy, order)
  }, [limit, page, sortBy, order, props])

  return (
    <div className="OptionBar">
      <label>Limit:</label>
      <input type="number" value={limit} onChange={(e) => setLimit(e.target.value)} />

      <label>Page:</label>
      <input type="number" value={page} onChange={(e) => setPage(e.target.value)} />

      <label>Sort By:</label>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value=""></option>
        <option value="id">id</option>
        <option value="title">title</option>
        <option value="createdAt">createdAt</option>
      </select>

      <label>Order:</label>
      <select value={order} onChange={(e) => setOrder(e.target.value)}>
        <option value=""></option>
        <option value="asc">asc</option>
        <option value="desc">desc</option>
      </select>
    </div>
  )
}

const BlogList = (props) => {
  const {blogs} = props;
  return (
    <div className="BlogList">
      {blogs.map((blog, index) => {
        return <BlogListCard blog={blog} key={index} />
      })}
    </div>
  )
}

const BlogListCard = (props) => {
  return (
    <div className="BlogListCard">
      <h2>{props.blog.title}</h2>
      <p>Author: {props.blog.author}</p>
      <p>{props.blog.text}</p>
    </div>
  )
}

export default App;