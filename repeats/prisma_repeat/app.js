function sarala(nums, target) {
  if (nums.includes(target)) {
    nums.indexOf(target);
  }
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > target) {
      nums.splice(i, 0, target);
      return nums.indexOf(target);
    }
  }
}
