import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import moment from "moment"

const API_PATH_ARTICLES = "api/react/articles"

function Article() {
  const [articles, setArticles] = useState([])

  const fetchData = async () =>{
    try{
    const {data, statusText} = await axios.get(`${process.env.REACT_APP_URL + API_PATH_ARTICLES}`)
    if(statusText === "OK"){
      setArticles([...data.articles])
    }
    }catch(err){
      console.log(err)
    }

  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="container">
      文章
      <div className="card">
        <div className="card-header bg-white">
          <h5 className="">文章列表</h5>
        </div>
        <div className="table-responsive">
          <table className="table table-hover table-nowrap">
            <thead className="table-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">文章名稱</th>
                <th scope="col">文章描述</th>
                <th scope="col">文章作者</th>
                <th scope="col">文章日期</th>
                <th scope="col">文章狀態</th>
                <th scope="col">文章標籤</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>

              {
                articles.map((article, index) => {
                  return <tr key={article.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{article.title}</td>
                    <td>{article.description}</td>
                    <td>{article.author}</td>
                    <td>{moment(article.create_at).format('YYYY-MM/DD HH:mm:ss')}</td>
                    <td>{article.isPublic ? '公開' : '未公開'}</td>
                    <td>{article.tag.map(tag => tag)}</td>
                    <td>
                      <Link to={article.id} className="btn btn-sm btn-neutral">查看</Link>
                    </td>
                  </tr>
                })
              }

            </tbody>
          </table>
        </div>
        <div className="card-footer bg-white py-3 text-end">
          <span className="text-muted text-sm ">總共{articles.length}筆資料</span>
        </div>
      </div>
    </div>
  )
}

export default Article;