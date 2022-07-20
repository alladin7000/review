function likepost(id,likedby){
    console.log(`id:${id}\nliked by:${likedby}`)
    fetch(`/postapi/${id}`)
.then(response => response.json())
.then(blogpost => {
    console.log(blogpost);
    const likescount = blogpost.likes


    fetch(`/likesapi/${id}`, {
        method: 'POST',
        body: JSON.stringify({
            "id":id,
            "likedby":likedby[0],
            "likes":likescount+1
        })
      })
      .then(response => response.json())
      .then(result => {
          console.log(result);
          likesdiv = document.querySelector(`#likes-${id}`)
          likesdiv.innerHTML = `<p><img class="unlikebtn" id="unlikebtn-${id}" src="https://cdn.icon-icons.com/icons2/2656/PNG/512/hearts_emo_emoticon_face_emoji_icon_161005.png"/> <b>${likescount+1}</b></p>`
          unlikebtn = document.querySelector(`#unlikebtn-${id}`)
          unlikebtn.onclick = ()=> {
            unlikepost(id,likedby)
                                    }
      });

});
    }

function unlikepost(id,unlikedby){
    console.log(`id: ${id}\nunlikedby: ${unlikedby}`)
    fetch(`/postapi/${id}`)
    .then(response => response.json())
    .then(bpost => {
                console.log(bpost.likes);
                const likescount = bpost.likes
                fetch(`/likesapi/${id}`, {
                    method: 'DELETE',
                    body: JSON.stringify({
                        "id": id,
                        "unlikedby": unlikedby[0],
                        "likes": likescount-1
                    })
                  })
                  .then(response => response.json())
      .then(result => {
          console.log(result);
          likesdiv = document.querySelector(`#likes-${id}`)
          likesdiv.innerHTML = `<p><img class="likebtn" id="likebtn-${id}" src="https://cdn.icon-icons.com/icons2/2656/PNG/512/smiling_emo_emoticon_face_emoji_icon_161041.png"/> <b>${likescount-1}</b></p>`
          likebtn = document.querySelector(`#likebtn-${id}`)
          likebtn.onclick = ()=> {
          likepost(id,unlikedby)
                                    }
      });
                    });
}

    