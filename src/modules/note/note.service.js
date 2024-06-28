const noteModel = require("../../models/note");
const pager = require("../../utils/pager");


async function save(user){
    let project = new noteModel(user)  
    return await project.save()
}

async function paginated(params) {
    let perPage = params.perPage?params.perPage:10, page = Math.max(0, params.page)
    let filter = params.filter?params.filter:{}
    let sort = params.sort?params.sort:{}
  
    let count = await noteModel.countDocuments(filter)
    let data = await noteModel.find(filter)
      .limit(perPage)
      .skip(perPage * page)
      .sort(sort)
      .populate('user')
      .exec();
  
    return pager.createPager(page,data,count,perPage)
}

async function update(id, updatedProject) {
    return await noteModel.findByIdAndUpdate(id, updatedProject, { new: true }).exec();
}
  
async function remove(id) {
    return await noteModel.findOneAndDelete({ _id: id }).exec();
  }

module.exports = {
    save,
    paginated,
    update,
    remove
}