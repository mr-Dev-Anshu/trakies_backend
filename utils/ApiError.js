class ApiError extends Error {
    
     constructor(status , message="Some went wrong" )  {
         super(message) ; 
          this.status = status ; 
          this.message= message
     }
}

export {ApiError} ; 