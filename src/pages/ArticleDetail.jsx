import axios from "axios"
import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const API_PATH_ARTICLES = "api/react/article/"

function ArticleDetail () {
  const [articleDetail, setArticleDetail] = useState({title:"", author:"", content: "", tag: []})
  const { articleId } = useParams()

  const fetchData = async () => {
    try{
      const { data, statusText } = await axios.get(`${process.env.REACT_APP_URL + API_PATH_ARTICLES + articleId}`)
      if(statusText === "OK"){
        setArticleDetail(data.article)
      }
    }catch(err){
      console.log(err)
    }
  }

  const onArticleChange = (e) => {
    const { id, value } = e.target
    setArticleDetail({
      ...articleDetail,
      [id]: value
    })
  }

  const onTagChange = (e) => {
    const { id, value } = e.target
    if(!value.trim().length) return
    const temp = [...articleDetail.tag]
    temp[Number(id)] = value

    if(id === 'tag') {
       temp.push(value)
       e.target.blur()
    }
    setArticleDetail({
       ...articleDetail,
       tag: [...temp]})
  }
  
  const handleRemoveTag = (e) => {
    const { id } = e.target
    const temp = [...articleDetail.tag]
    Number(id) > 0 && temp.splice(Number(id), 1)
    Number(id) === 0 && temp.shift()
    setArticleDetail({
       ...articleDetail,
       tag: [...temp]})
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="container">
  <div className="row">
    <div className="col-md-6">
      <div className="card">
        <div className="card-header bg-white">
          <h5 className="card-title">文章內容</h5>
        </div>
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">文章名稱</label>
              <input type="text" className="form-control" id="title" value={articleDetail.title} onChange={onArticleChange}/>
            </div>
            <div className="mb-3">
              <label htmlFor="author" className="form-label">文章作者</label>
              <input type="text" className="form-control" id="author" value={articleDetail.author} onChange={onArticleChange}/>
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">文章描述</label>
              <textarea className="form-control" id="content" value={ articleDetail.content } onChange={onArticleChange}/>
            </div>
            <div className="row gx-1 mb-3">
               { articleDetail.tag.length > 0 && articleDetail.tag.map((tag, index) => {
                    return  <div className="col-md-2 mb-1" key={index}><div className="input-group input-group-sm">
                  <input type="text" className="form-control form-control" id={`${index}`} placeholder="請輸入標籤" value={tag} onChange={onTagChange}/>
                  <button type="button" className="btn btn-outline-danger" id={`${index}`} onClick={handleRemoveTag} >x</button>
                </div></div>
                  }) }
              <div className="col-md-2 mb-1">
                <div className="input-group input-group-sm">
                  <input type="text" className="form-control form-control" id="tag" placeholder="請輸入標籤" value="" onChange={onTagChange} />
                  <button type="button" className="btn btn-outline-danger">x</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div className="col-md-6">
      <div className="card">
        <div className="card-header bg-white">
          <h5 className="card-title">文章圖片</h5>
        </div>
        <div className="card-body">
          <img src={articleDetail.imgage} alt="" />
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default ArticleDetail
