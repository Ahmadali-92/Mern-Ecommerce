class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword, //mongodb ma $ ka nishan at ah isi liya
            $options: "i",
          },
        }
      : {};
    // console.log(keyword);
    this.query = this.query.find({ ...keyword });
    return this; //means yahi class
  }

  filter() {
    const queryCopy = { ...this.queryStr }; //object ko direct ni likhty
    // console.log(queryCopy);
    //Remove some fields for category
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => {
      delete queryCopy[key];
    });
    // console.log(queryCopy);
    //this.query==Product.find() is ka mtlb ya h

    //Filter for Pricing and Rating
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    // this.query = this.query.find(quryCopy);nichy isy wapis string ma convert kr diya h
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1; //50-10 k page2 pr jany k bad kitni product skip krni h

    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
