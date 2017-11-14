Pod::Spec.new do |s|
  s.name         = "react-native-version-check"
  s.version      = "2.0.1"
  s.summary      = "Version Check for react-native"

  s.homepage     = "https://github.com/kimxogus/react-native-version-check"

  s.license      = "MIT"
  s.authors      = { "kimxogus" => "emailhere" }
  s.platform     = :ios, "7.0"

  s.source       = { :git => "https://github.com/kimxogus/react-native-version-check.git" }

  s.source_files  = "ios/RNVersionCheck.{h,m}"

  s.dependency 'React'
end
