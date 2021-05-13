class APIFeatures {
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
    filter(){
        let queryObj = {...this.queryStr};
        const excluded = ['sort','fields','limit','page'];
        excluded.forEach(el => delete queryObj[el]);
        let queryStr = JSON.stringify(queryObj);
        queryStr= queryStr.replace(/\b(gt|gte|lt|lte)\b/g, m => `$${m}`);
        this.query = this.query.find( JSON.parse(queryStr) );
        return this;
    }
    limitFields() {
        if(this.queryStr.fields){
            const fields = this.queryStr.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        }else{
            this.query = this.query.select('-otherImages -__v');
        }

        return this;
    }
    paginate(){
        const page = this.queryStr.page * 1 || 1;
        const limit = this.queryStr.limit * 1 || 2 ;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

module.exports = APIFeatures;
