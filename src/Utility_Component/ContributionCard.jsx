import React from 'react'

export default function ContributionCard() {
  return (
    <div class="w-full max-w-sm bg-transparent hover:bg-[#1C2128] rounded-lg shadow transition delay-100 ease-in-out">
    <div class="flex justify-end px-4 pt-4">
    </div>
    <div class="flex flex-col items-center">
        <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://a-static.besthdwallpaper.com/solo-leveling-sung-jin-woo-wallpaper-2560x2048-88310_33.jpg" alt="Bonnie image"/>
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white"><span>#1</span> Bonnie Green</h5>
        <span class="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
    </div>
</div>
  )
}
